import { UserType } from '../shared/types';

/**
 * Менеджер сессии пользователя
 */
export default class SessionManager {
  /**
   * Ключ для хранения пользователя в localStorage
   */
  private static readonly _storageKey = 'chatUser';

  /**
   * Сохраняет информацию о пользователе в localStorage
   * @param {UserType} user Пользователь
   */
  static saveUser(user: UserType): void {
    try {
      localStorage.setItem(SessionManager._storageKey, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user session:', error);
    }
  }

  /**
   * Загружает информацию о пользователе из localStorage
   * @return {UserType|null} Пользователь или null, если сессия не найдена
   */
  static loadUser(): UserType | null {
    let loadedUser = null;

    try {
      const userData = localStorage.getItem(SessionManager._storageKey);
      loadedUser = userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error loading user session:', error);
      loadedUser = null;
    }

    return loadedUser;
  }

  /**
   * Удаляет информацию о пользователе из localStorage
   */
  static clearUser(): void {
    try {
      localStorage.removeItem(SessionManager._storageKey);
    } catch (error) {
      console.error('Error clearing user session:', error);
    }
  }

  /**
   * Проверяет, сохранена ли сессия пользователя
   * @return {boolean} true, если сессия сохранена, false в противном случае
   */
  static hasUser(): boolean {
    return SessionManager.loadUser() !== null;
  }
}
