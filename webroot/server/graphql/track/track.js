import Tracks from './tracksModel';
import User from '../user/userModel';

export const TrackType = `
   type TrackType {
    id: ID
    name: String
    genre: String
    userId: User
  }
`;

export const getAllTracksQuery = `
    getTracks: [TrackType]
`;
export const getTrackQuery = `
    getTrack(userId: String):[TrackType]
`;

export const getTracks = async () => {
  return Tracks.find({});
};
export const getTrack = async (parent, args) => {
  const result = await Tracks.find({ userId: args.userId });
  return result;
};
