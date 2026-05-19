import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { authMiddleware, ensureAuthenticated, restrictToRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

const adminRestrictMiddleware = restrictToRole('ADMIN');

router.use(ensureAuthenticated);
router.use(adminRestrictMiddleware);

router.get('/users', async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ error: "You must be authenticated to access this!" });
    }

    const users = await db.select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email
    }).from(usersTable);
    res.status(200).json({ message: "Users fetched successfully!", users });
});

export default router;