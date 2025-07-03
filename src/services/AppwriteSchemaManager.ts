import { databases, databaseId, videoCollectionId, userCollectionId, siteConfigCollectionId, sessionCollectionId } from './node_appwrite';
import { ID } from 'appwrite';

/**
 * Service to manage Appwrite database schema
 * Ensures all required attributes exist in collections
 */
export class AppwriteSchemaManager {
  /**
   * Initialize all collections and ensure required attributes exist
   */
  static async initializeSchema(): Promise<void> {
    try {
      console.log('Initializing Appwrite schema...');
      
      await Promise.all([
        this.ensureVideoCollectionAttributes(),
        this.ensureSiteConfigCollectionAttributes(),
        this.ensureUserCollectionAttributes(),
        this.ensureSessionCollectionAttributes()
      ]);
      
      console.log('Schema initialization complete');
    } catch (error) {
      console.error('Error initializing schema:', error);
      throw error;
    }
  }
  
  /**
   * Ensure all required attributes exist in the video collection
   */
  private static async ensureVideoCollectionAttributes(): Promise<void> {
    try {
      console.log('Checking video collection attributes...');
      
      // Define required attributes for video collection
      const requiredAttributes = [
        { key: 'title', type: 'string', required: true },
        { key: 'description', type: 'string', required: false },
        { key: 'price', type: 'double', required: true, min: 0 },
        { key: 'duration', type: 'integer', required: false, min: 0 },
        { key: 'video_id', type: 'string', required: false },
        { key: 'thumbnail_id', type: 'string', required: false },
        { key: 'created_at', type: 'datetime', required: false },
        { key: 'is_active', type: 'boolean', required: false, defaultValue: true },
        { key: 'views', type: 'integer', required: false, min: 0, defaultValue: 0 },
        { key: 'product_link', type: 'string', required: false }
      ];
      
      // Get existing attributes
      const collection = await databases.getCollection(databaseId, videoCollectionId);
      const existingAttributes = collection.attributes;
      
      // Check each required attribute
      for (const attr of requiredAttributes) {
        const exists = existingAttributes.some((existing: any) => existing.key === attr.key);
        
        if (!exists) {
          console.log(`Creating missing attribute '${attr.key}' in video collection`);
          
          // Create the attribute based on its type
          switch (attr.type) {
            case 'string':
              await databases.createStringAttribute(
                databaseId,
                videoCollectionId,
                attr.key,
                attr.required,
                attr.defaultValue || null,
                255 // Max length for string
              );
              break;
            case 'integer':
              await databases.createIntegerAttribute(
                databaseId,
                videoCollectionId,
                attr.key,
                attr.required,
                attr.defaultValue || null,
                attr.min,
                attr.max
              );
              break;
            case 'double':
              await databases.createFloatAttribute(
                databaseId,
                videoCollectionId,
                attr.key,
                attr.required,
                attr.defaultValue || null,
                attr.min,
                attr.max
              );
              break;
            case 'boolean':
              await databases.createBooleanAttribute(
                databaseId,
                videoCollectionId,
                attr.key,
                attr.required,
                attr.defaultValue || null
              );
              break;
            case 'datetime':
              await databases.createDatetimeAttribute(
                databaseId,
                videoCollectionId,
                attr.key,
                attr.required,
                attr.defaultValue || null
              );
              break;
          }
          
          // Wait for attribute to be available
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      console.log('Video collection attributes verified');
    } catch (error) {
      console.error('Error ensuring video collection attributes:', error);
    }
  }
  
  /**
   * Ensure all required attributes exist in the site config collection
   */
  private static async ensureSiteConfigCollectionAttributes(): Promise<void> {
    try {
      console.log('Checking site config collection attributes...');
      
      // Define required attributes for site config collection
      const requiredAttributes = [
        { key: 'site_name', type: 'string', required: true },
        { key: 'paypal_client_id', type: 'string', required: false },
        { key: 'stripe_publishable_key', type: 'string', required: false },
        { key: 'stripe_secret_key', type: 'string', required: false },
        { key: 'telegram_username', type: 'string', required: false },
        { key: 'video_list_title', type: 'string', required: false },
        { key: 'crypto', type: 'string[]', required: false, array: true },
        { key: 'email_host', type: 'string', required: false },
        { key: 'email_port', type: 'string', required: false },
        { key: 'email_secure', type: 'boolean', required: false },
        { key: 'email_user', type: 'string', required: false },
        { key: 'email_pass', type: 'string', required: false },
        { key: 'email_from', type: 'string', required: false }
      ];
      
      // Get existing attributes - use databases directly
      const collection = await databases.getCollection(databaseId, siteConfigCollectionId);
      const existingAttributes = collection.attributes;
      
      // Check each required attribute
      for (const attr of requiredAttributes) {
        const exists = existingAttributes.some((existing: any) => existing.key === attr.key);
        
        if (!exists) {
          console.log(`Creating missing attribute '${attr.key}' in site config collection`);
          
          // Create the attribute based on its type
          if (attr.type === 'string[]') {
            await databases.createStringAttribute(
              databaseId,
              siteConfigCollectionId,
              attr.key,
              attr.required,
              null,
              255,
              true // isArray
            );
          } else {
            switch (attr.type) {
              case 'string':
                await databases.createStringAttribute(
                  databaseId,
                  siteConfigCollectionId,
                  attr.key,
                  attr.required,
                  attr.defaultValue || null,
                  255
                );
                break;
              case 'boolean':
                await databases.createBooleanAttribute(
                  databaseId,
                  siteConfigCollectionId,
                  attr.key,
                  attr.required,
                  attr.defaultValue || null
                );
                break;
            }
          }
          
          // Wait for attribute to be available
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      console.log('Site config collection attributes verified');
    } catch (error) {
      console.error('Error ensuring site config collection attributes:', error);
    }
  }
  
  /**
   * Ensure all required attributes exist in the user collection
   */
  private static async ensureUserCollectionAttributes(): Promise<void> {
    try {
      console.log('Checking user collection attributes...');
      
      // Define required attributes for user collection
      const requiredAttributes = [
        { key: 'email', type: 'string', required: true },
        { key: 'name', type: 'string', required: true },
        { key: 'password', type: 'string', required: true },
        { key: 'created_at', type: 'datetime', required: false }
      ];
      
      // Get existing attributes - use databases directly
      const collection = await databases.getCollection(databaseId, userCollectionId);
      const existingAttributes = collection.attributes;
      
      // Check each required attribute
      for (const attr of requiredAttributes) {
        const exists = existingAttributes.some((existing: any) => existing.key === attr.key);
        
        if (!exists) {
          console.log(`Creating missing attribute '${attr.key}' in user collection`);
          
          // Create the attribute based on its type
          switch (attr.type) {
            case 'string':
              await databases.createStringAttribute(
                databaseId,
                userCollectionId,
                attr.key,
                attr.required,
                attr.defaultValue || null,
                255
              );
              break;
            case 'datetime':
              await databases.createDatetimeAttribute(
                databaseId,
                userCollectionId,
                attr.key,
                attr.required,
                attr.defaultValue || null
              );
              break;
          }
          
          // Wait for attribute to be available
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      console.log('User collection attributes verified');
    } catch (error) {
      console.error('Error ensuring user collection attributes:', error);
    }
  }
  
  /**
   * Ensure all required attributes exist in the session collection
   */
  private static async ensureSessionCollectionAttributes(): Promise<void> {
    try {
      console.log('Checking session collection attributes...');
      
      // Define required attributes for session collection
      const requiredAttributes = [
        { key: 'user_id', type: 'string', required: true },
        { key: 'token', type: 'string', required: true },
        { key: 'expires_at', type: 'datetime', required: true },
        { key: 'created_at', type: 'datetime', required: false },
        { key: 'ip_address', type: 'string', required: false },
        { key: 'user_agent', type: 'string', required: false }
      ];
      
      // Get existing attributes - use databases directly
      const collection = await databases.getCollection(databaseId, sessionCollectionId);
      const existingAttributes = collection.attributes;
      
      // Check each required attribute
      for (const attr of requiredAttributes) {
        const exists = existingAttributes.some((existing: any) => existing.key === attr.key);
        
        if (!exists) {
          console.log(`Creating missing attribute '${attr.key}' in session collection`);
          
          // Create the attribute based on its type
          switch (attr.type) {
            case 'string':
              await databases.createStringAttribute(
                databaseId,
                sessionCollectionId,
                attr.key,
                attr.required,
                attr.defaultValue || null,
                255
              );
              break;
            case 'datetime':
              await databases.createDatetimeAttribute(
                databaseId,
                sessionCollectionId,
                attr.key,
                attr.required,
                attr.defaultValue || null
              );
              break;
          }
          
          // Wait for attribute to be available
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      console.log('Session collection attributes verified');
    } catch (error) {
      console.error('Error ensuring session collection attributes:', error);
    }
  }
}