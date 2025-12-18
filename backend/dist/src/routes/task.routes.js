"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/task.routes.ts
const express_1 = require("express");
const prisma_1 = require("../prisma");
const router = (0, express_1.Router)();
// CREATE
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'กรุณาระบุ title' });
        }
        const task = yield prisma_1.prisma.task.create({
            data: { title, description },
        });
        res.status(201).json({ data: task });
    }
    catch (err) {
        console.error('CREATE error:', err);
        res.status(500).json({ message: `ไม่สามารถสร้างงานได้ เนื่องจาก ${err}` });
    }
}));
// READ ALL
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma_1.prisma.task.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json({ data: tasks });
    }
    catch (err) {
        console.error('READ ALL error:', err);
        res.status(500).json({ message: `ไม่สามารถดึงรายการได้ เนื่องจาก ${err}` });
    }
}));
// READ ONE
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield prisma_1.prisma.task.findUnique({
            where: { id: req.params.id },
        });
        if (!task) {
            return res.status(404).json({ message: `ไม่พบงาน ${req.params.id}` });
        }
        res.json({ data: task });
    }
    catch (err) {
        console.error('READ ONE error:', err);
        res.status(500).json({ message: `ไม่สามารถดึงข้อมูลได้ เนื่องจาก ${err}` });
    }
}));
// UPDATE (PATCH)
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const task = yield prisma_1.prisma.task.update({
            where: { id: req.params.id },
            data: Object.assign(Object.assign({}, (title && { title })), (description !== undefined && { description })),
        });
        res.json({ data: task });
    }
    catch (err) {
        console.error('UPDATE error:', err);
        if (err.code === 'P2025') {
            return res.status(404).json({ message: `ไม่พบงานที่ต้องการอัปเดต ${req.params.id}` });
        }
        res.status(500).json({ message: `ไม่สามารถอัปเดตได้ เนื่องจาก ${err}` });
    }
}));
// DELETE
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.task.delete({
            where: { id: req.params.id },
        });
        res.json({ message: `ลบงานสำเร็จ ${req.params.id}` });
    }
    catch (err) {
        console.error('DELETE error:', err);
        if (err.code === 'P2025') {
            return res.status(404).json({ message: `ไม่พบงานที่ต้องการลบ ${req.params.id}` });
        }
        res.status(500).json({ message: `ไม่สามารถลบได้ เนื่องจาก ${err}` });
    }
}));
exports.default = router;
