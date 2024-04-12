import db from '../db.js';

// Fonction pour récupérer toutes les missions depuis la base de données
export const getMissions = async (req, res) => {
    try {
        const missions = await db.select().from('MISSION');
        
        res.json(missions);
    } catch (error) {
        console.error('Error while fetching missions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fonction pour récupérer tous les statuts de mission depuis la base de données
export const getStatutMissions = async (req, res) => {
    try {
        const statutMissions = await db.select().from('STATUT_MISSION');
        
        res.json(statutMissions);
    } catch (error) {
        console.error('Error while fetching statut missions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Route pour modifier une mission
export const updateMission = async (req, res) => {
  const { id } = req.params;
  const updatedMission = req.body;

  try {
    const existingMission = await db('MISSION').where({ id }).first();

    if (!existingMission) {
      return res.status(404).json({ message: "Mission not found" });
    }

    await db('MISSION').where({ id }).update(updatedMission);

    const updatedMissionFromDB = await db('MISSION').where({ id }).first();

    res.json(updatedMissionFromDB);
  } catch (error) {
    console.error('Error while updating mission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Route pour ajouter une nouvelle mission
export const addMission = async (req, res) => {
    try {
      const newMission = req.body;
  
      const [addedMissionId] = await db('MISSION').insert(newMission);
  
      const addedMission = await db('MISSION').where({ id: addedMissionId }).first();
  
      res.status(201).json(addedMission);
    } catch (error) {
      console.error('Error while adding mission:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Route pour supprimer une mission existante
export const deleteMission = async (req, res) => {
  const { id } = req.params;

  try {
    const existingMission = await db('MISSION').where({ id }).first();

    if (!existingMission) {
      return res.status(404).json({ message: "Mission not found" });
    }

    await db('MISSION').where({ id }).del();

    res.json({ message: "Mission deleted successfully" });
  } catch (error) {
    console.error('Error while deleting mission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
