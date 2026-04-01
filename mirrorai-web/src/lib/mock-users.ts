// In-memory mock user store for development without database
export const mockUsers: Map<string, { id: string; email: string; passwordHash: string; name: string | null; role: string; createdAt: Date }> = new Map()

