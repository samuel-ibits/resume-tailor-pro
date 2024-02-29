import NotificationModel, { Notification } from '../../models/notification';

export async function createNotification(notificationData: Partial<Notification>): Promise<Notification | null> {
  try {
    const notification = await NotificationModel.create(notificationData);
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
}

// Implement other notification-related functions like getNotificationById, updateNotification, deleteNotification, etc.
