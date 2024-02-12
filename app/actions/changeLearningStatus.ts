'use server'
import { changeLearningStatus as changeLearningStatusDb } from '../db'
import { LearningStatus } from '../types'

export async function changeLearningStatus(
  translationId: number,
  status: LearningStatus
) {
  return changeLearningStatusDb(translationId, 1, status)
}