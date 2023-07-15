"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.post("/add-todo", (req, res, next) => {
    const text = req.body.text;
    const id = new Date().toISOString();
    todos.push({
        id: id,
        text: text
    });
    res.json({
        message: 'Added todo'
    });
});
router.delete("/delete-todo", (req, res, next) => {
    const id = req.body.id;
    const updatedTodos = todos.filter(todo => {
        return todo.id !== id;
    });
    if (todos.length === updatedTodos.length) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }
    else {
        todos = [...updatedTodos];
        res.json({
            message: 'Todo deleted'
        });
    }
});
router.post("/edit-todo", (req, res, next) => {
    const id = req.body.id;
    const text = req.body.text;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: text };
        return res.json({
            message: 'updated todo'
        });
    }
    res.status(404).json({
        message: 'Todo not found'
    });
});
router.get("/", (req, res, next) => {
    res.json(todos);
});
exports.default = router;
