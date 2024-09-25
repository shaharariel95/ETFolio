// models/ETF.ts
import mongoose from 'mongoose';

const ETFSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    shares: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
    currentPrice: { type: Number, required: true },
});

const ETF = mongoose.models.ETF || mongoose.model('ETF', ETFSchema);

export default ETF;
