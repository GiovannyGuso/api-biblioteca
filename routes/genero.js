const express = require("express");
const router = express.Router();
const Genero = require("../models/genero")

//GET para obetenr todos los generos
router.get("/", async (req, res) => {
    try {
        const generos = await Genero.findAll();
        res.json(generos);
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ "mensaje": "Error al obtener" })
    }
})

//GET para obtener un genero por id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByPk(id);
        if (!genero) {
            res.status(404).json({ "mensaje": "No se encontro" })
        }
        res.json(genero);
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ "mensaje": "Error al obtener" })
    }
})

//POST para crear un nuevo genero
router.post("/", async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const genero = await Genero.create({ nombre, descripcion });
        res.status(201).json(genero);
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ "mensaje": "Error al obtener" })
    }
})

//PUT para actualizar un genero por id
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, descripcion } = req.body;

        const genero = await Genero.findByPk(id);
        if (!genero) return res.status(404).json({ mensaje: "No se encontro" });
        await genero.update({ nombre, descripcion });
        return res.json(genero);

    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ "mensaje": "Error al obtener" })
    }
})

//DELETE para eliminar un genero por id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByPk(id);
        if (!genero) return res.status(404).json({ mensaje: "No se encontro" });
        await genero.destroy();
        return res.json({ mensaje: `El genero con el id ${id} fue eliminado.` });

    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({ "mensaje": "Error al obtener" })
    }
})

module.exports = router;