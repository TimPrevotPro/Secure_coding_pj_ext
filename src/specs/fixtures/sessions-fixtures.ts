import { Session } from '../../entities/session'
import { buildUserFixture } from './users-fixtures'
import { User } from '../../entities/User'
import { AppDataSource } from '../../lib/typeorm.js'

type SessionFixtureOptions = { user?: User }

export function buildSessionFixture(opts: SessionFixtureOptions = {}) {
    const session = new Session()
    session.user = opts.user ?? buildUserFixture()
    return session
}

export async function createSessionFixture(opts: SessionFixtureOptions = {}) {
    return AppDataSource.getRepository(Session).save(buildSessionFixture(opts))
}