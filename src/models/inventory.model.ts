import mongoose, { Schema, Document } from 'mongoose';

export interface IInventory extends Document {
  _id: string;
  type: 'oxygenCylinder' | 'monitors' | 'ventilators';
  quantity: number;
  wardId: string; // Reference to Ward (ObjectId)
  status: 'available' | 'notAvailable';
}

const InventorySchema: Schema = new Schema({
  type: { type: String, enum: ['oxygenCylinder', 'monitors', 'ventilators'], required: true },
  quantity: { type: Number, required: true },
  wardId: { type: Schema.Types.ObjectId, ref: 'Ward', required: true },
  status: { type: String, enum: ['available', 'notAvailable'], required: true }
});

export default mongoose.model<IInventory>('Inventory', InventorySchema);