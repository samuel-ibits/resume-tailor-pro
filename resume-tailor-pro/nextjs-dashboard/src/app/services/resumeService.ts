import ResumeModel, { Resume } from '../../models/resume';

export async function createResume(resumeData: Partial<Resume>): Promise<Resume | null> {
  try {
    const resume = await ResumeModel.create(resumeData);
    return resume;
  } catch (error) {
    console.error('Error creating resume:', error);
    return null;
  }
}

// Implement other resume-related functions like getResumeById, updateResume, deleteResume, etc.
