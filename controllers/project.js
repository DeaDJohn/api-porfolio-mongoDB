'use strict'

var Project = require('../models/project');

var controller = {
    home: function(req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function(req, res) {
        return res.status(200).send({
            message: 'Soy el metodo o accion test'
        });
    },

    saveProyect: function(req, res) {
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: "Error al guardar el documento" });

            if (!projectStored) return res.status(404).send({ message: "No se ha podido guardar" });

            return res.status(200).send({ project: projectStored });
        });
    },

    getProject: function(req, res) {
        var projectId = req.params.id;

        if (projectId == null) return res.status(404).send({ message: "El projecto no existe" });

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: "Error al devolver los datos" });

            if (!project) return res.status(404).send({
                message: "El projecto no existe"
            });

            return res.status(200).send({
                project
            });

        });
    },

    getProjects: function(req, res) {
        // en el find puedes poner el filtro que necestites para buscar en mongoDB
        Project.find({}).sort('+year').exec((err, projects) => {
            if (err) res.status(500).send({ message: "Error al devolver los datos" });

            if (!projects) res.status(404).send({ message: "No hay proyectos que mostrar" });

            return res.status(200).send({ projects });
        })
    },

    updateProject: function(req, res) {
        var projectId = req.params.id;
        var update = req.body;

        if (projectId == null) return res.status(404).send({
            message: "No ha seleccionado ningún proyecto"
        });

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) res.status(500).send({
                message: "Error al actualizar los datos"
            });

            if (!projectUpdated) res.status(404).send({
                message: "No hay proyectos que actualizar"
            });

            return res.status(200).send({
                projectUpdated
            });
        });
    },

    deleteProject: function(req, res) {
        var projectId = req.params.id;
        var update = req.body;

        if (projectId == null) return res.status(404).send({
            message: "No ha seleccionado ningún proyecto"
        });

        Project.findByIdAndRemove(projectId, (err, projectRemove) => {
            if (err) res.status(500).send({
                message: "No se ha podido borrar el proyecto"
            });

            if (!projectRemove) res.status(404).send({
                message: "No se puede eliminar ese proyecto"
            });

            return res.status(200).send({
                project: projectRemove,
                message: "Proyecto eliminado"
            });
        });
    },

    uploadImage: function(req, res) {
        var projectId = req.params.id;
        var fileName = "Imagen no súbida...";
        console.log(req.files);
        if (projectId == null) return res.status(404).send({
            message: "No ha seleccionado ningún proyecto"
        });

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            console.log(req.files);
            Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
                if (err) res.status(500).send({
                    message: "La imagen no se ha súbido"
                });
                if (!projectUpdated) res.status(404).send({
                    message: "El proyecto no existe"
                });
                return res.status(200).send({
                    project: projectUpdated
                });
            });
            return res.status(200).send({
                files: req.files,
                message: fileName
            });
        } else {
            return res.status(200).send({
                message: fileName,
            });
        }

    }

}

module.exports = controller;