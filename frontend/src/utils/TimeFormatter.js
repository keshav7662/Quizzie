export const formatTime = (createdAt) => {
  return new Date(createdAt).toISOString().split('T')[0];
};