// app/api/submit.js
import mongoose from 'mongoose';

// Подключение к базе данных MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Определение схемы и модели данных
const SubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  telegramLink: { type: String, required: true },
});

const Submission = mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const { name, telegramLink } = req.body;

      // Сохранение данных в базе
      const newSubmission = new Submission({ name, telegramLink });
      await newSubmission.save();

      res.status(200).json({ message: 'Data submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error submitting data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
