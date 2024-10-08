const { db, admin } = require('../../firebase');

// Get configuration
const getConfig = async (req, res) => {
    try {
        const configDoc = await db.collection('configurations').doc('appConfig').get();

        if (!configDoc.exists) {
            return res.status(404).json({ error: 'Configuration not found' });
        }

        const configData = configDoc.data();
        res.status(200).json(configData);
    } catch (error) {
        console.error('Error fetching configuration from Firestore:', error);
        res.status(500).json({ error: 'Error fetching configuration' });
    }
};

// Delete configuration
const deleteConfig = async (req, res) => {
    const { key } = req.body;

    try {
        const configDocRef = db.collection('configurations').doc('appConfig');
        const configDoc = await configDocRef.get();

        if (!configDoc.exists) {
            return res.status(404).json({ error: 'Configuration not found' });
        }

        const configData = configDoc.data();

        if (!(key in configData)) {
            return res.status(404).json({ error: 'Configuration key not found' });
        }

        const updateData = {};
        updateData[key] = admin.firestore.FieldValue.delete();
        await configDocRef.update(updateData);

        res.status(200).json({ message: 'Configuration deleted successfully' });
    } catch (error) {
        console.error('Error deleting configuration:', error);
        res.status(500).json({ error: 'Error deleting configuration' });
    }
};

// Update configuration
const updateConfig = async (req, res) => {
    const { key, value, description } = req.body;
    const uid = req.user.uid;

    try {
        const updateData = {
            [key]: {
                value,
                description,
                lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
            },
            updatedBy: uid,
        };

        await db.collection('configurations').doc('appConfig').set(updateData, { merge: true });

        res.status(200).json({ message: 'Update successful' });
    } catch (error) {
        console.error('Error updating configuration:', error);
        res.status(500).json({ error: 'Error updating configuration' });
    }
};

// Add configuration
const addConfig = async (req, res) => {
    const { key, value, description } = req.body;
    const uid = req.user.uid;

    try {
        await db.collection('configurations').doc('appConfig').set({
            [key]: {
                value,
                description,
                createdDate: admin.firestore.FieldValue.serverTimestamp(),
            },
            updatedBy: uid,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });

        res.status(200).json({ message: 'Configuration added successfully' });
    } catch (error) {
        console.error('Error adding configuration:', error);
        res.status(500).json({ error: 'Error adding configuration' });
    }
};

module.exports = { getConfig, deleteConfig, updateConfig, addConfig };
