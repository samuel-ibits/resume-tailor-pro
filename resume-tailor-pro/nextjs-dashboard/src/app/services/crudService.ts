import { Document, Model, Types } from 'mongoose';
import  connectMongoDB from "@/lib/mongo";




// Define a generic interface for a document with a potentially optional ID
type MaybeId<T> = T extends { _id: Types.ObjectId } ? T : T & { _id?: Types.ObjectId };

// Define a generic CRUD service
export class CrudService<T extends MaybeId<Document>> {
  constructor(private model: Model<T>) {}

  // Create a new document
  async create(data: Partial<T>): Promise<T | null> {
    await connectMongoDB();
    try {
      const document = await this.model.create(data);
      return document;
    } catch (error) {
      console.error(`Error creating document: ${error}`);
      return null;
    }
  }


  // Get all document
  async getAll(): Promise<any | null> {
    await connectMongoDB();
    try {
      const document = await this.model.find();
      return document;
    } catch (error) {
      console.error(`Error getting documents: ${error}`);
      return null;
    }
  }

  // Get a document by its ID
  async getById(id: string): Promise<T | null> {
    await connectMongoDB();
    try {
      const document = await this.model.findById(id);
      return document;
    } catch (error) {
      console.error(`Error getting document by ID: ${error}`);
      return null;
    }
  }

  // Update an existing document
  async update(id: string, updates: Partial<T>): Promise<T | null> {
    await connectMongoDB();
    try {
      const document = await this.model.findByIdAndUpdate(id, updates, { new: true });
      return document;
    } catch (error) {
      console.error(`Error updating document: ${error}`);
      return null;
    }
  }

  // Delete a document by its ID
  async delete(id: string): Promise<boolean> {
    await connectMongoDB();
    try {
      const result = await this.model.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
      return false;
    }
  }
}
