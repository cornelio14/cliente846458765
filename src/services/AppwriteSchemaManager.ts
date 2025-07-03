import { databaseId, videoCollectionId, userCollectionId, siteConfigCollectionId, sessionCollectionId } from './node_appwrite';
import { Client, Databases } from 'appwrite';

/**
 * Service to manage Appwrite database schema
 * Uses API key authentication for administrative operations
 */
export class AppwriteSchemaManager {
  /**
   * Get a fresh Appwrite databases instance with API key authentication
   */
  private static getDatabasesInstance(): Databases {
    const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
    const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
    const apiKey = import.meta.env.VITE_APPWRITE_API_KEY;
    
    if (!apiKey) {
      console.error('VITE_APPWRITE_API_KEY is not defined in environment variables');
      throw new Error('API Key is required for schema management');
    }
    
    const client = new Client();
    (client as any)
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setKey(apiKey); // Use API key for authentication
    
    return new Databases(client);
  }
  
  /**
   * Initialize all collections and ensure required attributes exist
   */
  static async initializeSchema(): Promise<void> {
    try {
      console.log('Initializing Appwrite schema...');
      
      // Run each collection check independently so that if one fails, others can still run
      try {
        await this.ensureVideoCollectionAttributes();
      } catch (error) {
        console.error('Error ensuring video collection attributes:', error);
      }
      
      try {
        await this.ensureSiteConfigCollectionAttributes();
      } catch (error) {
        console.error('Error ensuring site config collection attributes:', error);
      }
      
      try {
        await this.ensureUserCollectionAttributes();
      } catch (error) {
        console.error('Error ensuring user collection attributes:', error);
      }
      
      try {
        await this.ensureSessionCollectionAttributes();
      } catch (error) {
        console.error('Error ensuring session collection attributes:', error);
      }
      
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
      console.log('Creating video collection attributes...');
      
      // Get a fresh databases instance with API key
      const db = this.getDatabasesInstance();
      
      // Try to create each attribute one by one
      try {
        await (db as any).createStringAttribute(
          databaseId,
          videoCollectionId,
          'title',
          true,
          null,
          255
        );
        console.log('Created title attribute');
      } catch (error) {
        console.log('Title attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          videoCollectionId,
          'description',
          false,
          null,
          5000
        );
        console.log('Created description attribute');
      } catch (error) {
        console.log('Description attribute may already exist');
      }
      
      try {
        await (db as any).createFloatAttribute(
          databaseId,
          videoCollectionId,
          'price',
          true,
          null,
          0,
          null
        );
        console.log('Created price attribute');
      } catch (error) {
        console.log('Price attribute may already exist');
      }
      
      try {
        await (db as any).createIntegerAttribute(
          databaseId,
          videoCollectionId,
          'duration',
          false,
          null,
          0,
          null
        );
        console.log('Created duration attribute');
      } catch (error) {
        console.log('Duration attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          videoCollectionId,
          'video_id',
          false,
          null,
          255
        );
        console.log('Created video_id attribute');
      } catch (error) {
        console.log('Video_id attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          videoCollectionId,
          'thumbnail_id',
          false,
          null,
          255
        );
        console.log('Created thumbnail_id attribute');
      } catch (error) {
        console.log('Thumbnail_id attribute may already exist');
      }
      
      try {
        await (db as any).createDatetimeAttribute(
          databaseId,
          videoCollectionId,
          'created_at',
          false,
          null
        );
        console.log('Created created_at attribute');
      } catch (error) {
        console.log('Created_at attribute may already exist');
      }
      
      try {
        await (db as any).createBooleanAttribute(
          databaseId,
          videoCollectionId,
          'is_active',
          false,
          true
        );
        console.log('Created is_active attribute');
      } catch (error) {
        console.log('Is_active attribute may already exist');
      }
      
      try {
        await (db as any).createIntegerAttribute(
          databaseId,
          videoCollectionId,
          'views',
          false,
          0,
          0,
          null
        );
        console.log('Created views attribute');
      } catch (error) {
        console.log('Views attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          videoCollectionId,
          'product_link',
          false,
          null,
          1000
        );
        console.log('Created product_link attribute');
      } catch (error) {
        console.log('Product_link attribute may already exist');
      }
      
      console.log('Video collection attributes verified');
    } catch (error) {
      console.error('Error ensuring video collection attributes:', error);
      throw error;
    }
  }
  
  /**
   * Ensure all required attributes exist in the site config collection
   */
  private static async ensureSiteConfigCollectionAttributes(): Promise<void> {
    try {
      console.log('Creating site config collection attributes...');
      
      // Get a fresh databases instance with API key
      const db = this.getDatabasesInstance();
      
      // Create attributes one by one
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'site_name',
          true,
          null,
          255
        );
        console.log('Created site_name attribute');
      } catch (error) {
        console.log('Site_name attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'paypal_client_id',
          false,
          null,
          255
        );
        console.log('Created paypal_client_id attribute');
      } catch (error) {
        console.log('Paypal_client_id attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'stripe_publishable_key',
          false,
          null,
          255
        );
        console.log('Created stripe_publishable_key attribute');
      } catch (error) {
        console.log('Stripe_publishable_key attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'stripe_secret_key',
          false,
          null,
          255
        );
        console.log('Created stripe_secret_key attribute');
      } catch (error) {
        console.log('Stripe_secret_key attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'telegram_username',
          false,
          null,
          255
        );
        console.log('Created telegram_username attribute');
      } catch (error) {
        console.log('Telegram_username attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'video_list_title',
          false,
          null,
          255
        );
        console.log('Created video_list_title attribute');
      } catch (error) {
        console.log('Video_list_title attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'crypto',
          false,
          null,
          255,
          true
        );
        console.log('Created crypto attribute');
      } catch (error) {
        console.log('Crypto attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'email_host',
          false,
          null,
          255
        );
        console.log('Created email_host attribute');
      } catch (error) {
        console.log('Email_host attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'email_port',
          false,
          null,
          10
        );
        console.log('Created email_port attribute');
      } catch (error) {
        console.log('Email_port attribute may already exist');
      }
      
      try {
        await (db as any).createBooleanAttribute(
          databaseId,
          siteConfigCollectionId,
          'email_secure',
          false,
          false
        );
        console.log('Created email_secure attribute');
      } catch (error) {
        console.log('Email_secure attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'email_user',
          false,
          null,
          255
        );
        console.log('Created email_user attribute');
      } catch (error) {
        console.log('Email_user attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'email_pass',
          false,
          null,
          255
        );
        console.log('Created email_pass attribute');
      } catch (error) {
        console.log('Email_pass attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          siteConfigCollectionId,
          'email_from',
          false,
          null,
          255
        );
        console.log('Created email_from attribute');
      } catch (error) {
        console.log('Email_from attribute may already exist');
      }
      
      console.log('Site config collection attributes verified');
    } catch (error) {
      console.error('Error ensuring site config collection attributes:', error);
      throw error;
    }
  }
  
  /**
   * Ensure all required attributes exist in the user collection
   */
  private static async ensureUserCollectionAttributes(): Promise<void> {
    try {
      console.log('Creating user collection attributes...');
      
      // Get a fresh databases instance with API key
      const db = this.getDatabasesInstance();
      
      // Create attributes one by one
      try {
        await (db as any).createStringAttribute(
          databaseId,
          userCollectionId,
          'email',
          true,
          null,
          255
        );
        console.log('Created email attribute');
      } catch (error) {
        console.log('Email attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          userCollectionId,
          'name',
          true,
          null,
          255
        );
        console.log('Created name attribute');
      } catch (error) {
        console.log('Name attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          userCollectionId,
          'password',
          true,
          null,
          255
        );
        console.log('Created password attribute');
      } catch (error) {
        console.log('Password attribute may already exist');
      }
      
      try {
        await (db as any).createDatetimeAttribute(
          databaseId,
          userCollectionId,
          'created_at',
          false,
          null
        );
        console.log('Created created_at attribute');
      } catch (error) {
        console.log('Created_at attribute may already exist');
      }
      
      console.log('User collection attributes verified');
    } catch (error) {
      console.error('Error ensuring user collection attributes:', error);
      throw error;
    }
  }
  
  /**
   * Ensure all required attributes exist in the session collection
   */
  private static async ensureSessionCollectionAttributes(): Promise<void> {
    try {
      console.log('Creating session collection attributes...');
      
      // Get a fresh databases instance with API key
      const db = this.getDatabasesInstance();
      
      // Create attributes one by one
      try {
        await (db as any).createStringAttribute(
          databaseId,
          sessionCollectionId,
          'user_id',
          true,
          null,
          255
        );
        console.log('Created user_id attribute');
      } catch (error) {
        console.log('User_id attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          sessionCollectionId,
          'token',
          true,
          null,
          255
        );
        console.log('Created token attribute');
      } catch (error) {
        console.log('Token attribute may already exist');
      }
      
      try {
        await (db as any).createDatetimeAttribute(
          databaseId,
          sessionCollectionId,
          'expires_at',
          true,
          null
        );
        console.log('Created expires_at attribute');
      } catch (error) {
        console.log('Expires_at attribute may already exist');
      }
      
      try {
        await (db as any).createDatetimeAttribute(
          databaseId,
          sessionCollectionId,
          'created_at',
          false,
          null
        );
        console.log('Created created_at attribute');
      } catch (error) {
        console.log('Created_at attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          sessionCollectionId,
          'ip_address',
          false,
          null,
          45
        );
        console.log('Created ip_address attribute');
      } catch (error) {
        console.log('Ip_address attribute may already exist');
      }
      
      try {
        await (db as any).createStringAttribute(
          databaseId,
          sessionCollectionId,
          'user_agent',
          false,
          null,
          255
        );
        console.log('Created user_agent attribute');
      } catch (error) {
        console.log('User_agent attribute may already exist');
      }
      
      console.log('Session collection attributes verified');
    } catch (error) {
      console.error('Error ensuring session collection attributes:', error);
      throw error;
    }
  }
}
