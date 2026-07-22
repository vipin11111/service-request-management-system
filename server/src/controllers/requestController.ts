import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ServiceRequest } from '../models/ServiceRequest';
import mongoose from 'mongoose';

export const createRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, category, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    if (!req.user?.id) {
      return res.status(401).json({ error: 'User authentication required' });
    }

    const newRequest = new ServiceRequest({
      title,
      description,
      category: category || 'OTHER',
      priority: priority || 'MEDIUM',
      status: 'OPEN',
      createdBy: req.user.id,
      statusHistory: [
        {
          status: 'OPEN',
          changedBy: mongoose.Types.ObjectId.isValid(req.user.id)
            ? new mongoose.Types.ObjectId(req.user.id)
            : req.user.id,
          note: 'Request created',
        },
      ],
    });

    const savedRequest = await newRequest.save();
    return res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    return res.status(500).json({ error: 'Failed to create request', details: (error as Error).message });
  }
};

export const getRequests = async (req: AuthRequest, res: Response) => {
  try {
    const filter = req.user?.role === 'ADMIN' ? {} : { createdBy: req.user?.id };

    const requests = await ServiceRequest.find(filter)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    return res.status(500).json({ error: 'Failed to fetch requests', details: (error as Error).message });
  }
};

export const getRequestById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid request ID format' });
    }

    const request = await ServiceRequest.findById(id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('statusHistory.changedBy', 'name email');

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const ownerId = (request.createdBy as any)?._id
      ? (request.createdBy as any)._id.toString()
      : request.createdBy.toString();

    if (req.user?.role !== 'ADMIN' && ownerId !== req.user?.id) {
      return res.status(403).json({ error: 'Unauthorized: You do not have permission to view this request' });
    }

    return res.status(200).json(request);
  } catch (error) {
    console.error('Error fetching request by ID:', error);
    return res.status(500).json({ error: 'Error fetching request details', details: (error as Error).message });
  }
};

export const updateRequestStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid request ID format' });
    }

    const request = await ServiceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = status;
    await request.save();
    return res.status(200).json(request);
  } catch (error) {
    console.error('Error updating request status:', error);
    return res.status(500).json({ error: 'Failed to update status', details: (error as Error).message });
  }
};

export const assignRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid request ID format' });
    }

    const request = await ServiceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    return res.status(200).json({
      message: 'Request assignment simulated successfully (Mock)',
      request,
    });
  } catch (error) {
    console.error('Error assigning request:', error);
    return res.status(500).json({ error: 'Failed to assign request', details: (error as Error).message });
  }
};

export const cancelRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid request ID format' });
    }

    const request = await ServiceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (req.user?.role !== 'ADMIN' && request.createdBy.toString() !== req.user?.id) {
      return res.status(403).json({ error: 'Unauthorized: You can only cancel your own requests' });
    }

    request.status = 'CANCELLED';
    request.statusHistory.push({
      status: 'CANCELLED',
      changedBy: req.user?.id && mongoose.Types.ObjectId.isValid(req.user.id)
        ? new mongoose.Types.ObjectId(req.user.id)
        : (req.user?.id as any),
      note: 'Cancelled by user',
      changedAt: new Date(),
    });

    await request.save();
    return res.status(200).json(request);
  } catch (error) {
    console.error('Error cancelling request:', error);
    return res.status(500).json({ error: 'Failed to cancel request', details: (error as Error).message });
  }
};
