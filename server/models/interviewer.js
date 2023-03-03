import mongoose from 'mongoose';

const InterviewerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // add more as needed
});

export default mongoose.model('Interviewer', InterviewerSchema);
