const generateAvatarUrl = (userName) => {
  try {
    // Sanitize and validate username
    const seed = userName
      ? userName.replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '')  // Remove spaces
        .toLowerCase()
        .trim()
      : 'anonymous';

    // Add style parameters for better avatars
    const params = new URLSearchParams({
      seed,
      backgroundColor: 'ffffff',
      radius: '50',
      flip: 'false',
    });

    // Construct URL with error handling
    const baseUrl = 'https://api.dicebear.com/7.x/avataaars/svg';
    return `${baseUrl}?${params.toString()}`;
  } catch (error) {
    console.error('Avatar generation error:', error);
    // Fallback to default avatar if something goes wrong
    return 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback';
  }
};

module.exports = { generateAvatarUrl };