import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { loadExcel, loadCSV } from '../service/queryService.js';
import { askLLM } from '../service/llmService.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // temp file storage

// Helper to remove uploaded file after processing
function cleanupFile(path) {
    if (path && fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

// POST /query/excel
router.post('/excel', upload.single('file'), async (req, res) => {
    let filePath;
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'File is required' });
        }
        filePath = req.file.path;
        const sheetName = req.body.sheetName || null;
        const question = req.body.question;

        const dataset = await loadExcel(filePath, sheetName);
        console.log("Dataset loaded:", dataset);
        const answer = await askLLM(dataset, question);

        res.json({ success: true, answer });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    } finally {
        cleanupFile(filePath);
    }
});

// POST /query/csv
router.post('/csv', upload.single('file'), async (req, res) => {
    let filePath;
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'File is required' });
        }
        filePath = req.file.path;
        const question = req.body.question;

        const dataset = await loadCSV(filePath);
        const answer = await askLLM(dataset, question);

        res.json({ success: true, answer });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    } finally {
        cleanupFile(filePath);
    }
});

export default router;
