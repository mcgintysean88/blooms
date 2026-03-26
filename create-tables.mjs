// Script to create the necessary tables for the application
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '.env.local') });

const DATABASE_URL = process.env.DATABASE_URL;

async function updateSchema() {
  try {
    if (!DATABASE_URL) {
      console.error("ERROR: DATABASE_URL is not defined in environment");
      return;
    }
    
    console.log("Connecting to Neon database...");
    const sql = neon(DATABASE_URL);
    
    // Get current tables
    const tables = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `;
    
    console.log("\nExisting tables:");
    tables.forEach(table => {
      console.log(`- ${table.table_name}`);
    });
    
    // Create subscribers table if it doesn't exist
    console.log("\nCreating subscribers table if it doesn't exist...");
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL
      )
    `;
    
    // First check for and drop any dependencies (views, etc.)
    console.log("\nChecking for dependencies on contact_messages table...");
    try {
      const dependentViews = await sql`
        SELECT table_name 
        FROM information_schema.views 
        WHERE table_schema = 'public'
      `;
      
      console.log("Found views:", dependentViews.map(v => v.table_name).join(', ') || 'None');
      
      // Drop the contact_messages_view if it exists
      console.log("Dropping contact_messages_view if it exists...");
      await sql`DROP VIEW IF EXISTS contact_messages_view CASCADE`;
      console.log("View dependencies removed successfully.");
    } catch (viewErr) {
      console.log("Error checking views:", viewErr.message);
    }
    
    // Drop and recreate contact_messages table with proper columns
    console.log("\nDropping old contact_messages table...");
    try {
      // Get existing data first
      const existingData = await sql`SELECT * FROM contact_messages`;
      console.log(`Backing up ${existingData.length} existing contact messages...`);
      
      // Drop the table with CASCADE to handle dependencies
      await sql`DROP TABLE IF EXISTS contact_messages CASCADE`;
      console.log("Old table dropped successfully.");
      
      // Create new table with proper columns
      console.log("Creating new contact_messages table with individual columns...");
      await sql`
        CREATE TABLE contact_messages (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          street VARCHAR(255) NOT NULL,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(50) NOT NULL,
          zip VARCHAR(20) NOT NULL,
          property_type VARCHAR(100) NOT NULL,
          project_timeframe VARCHAR(100) NOT NULL,
          budget_range VARCHAR(100) NOT NULL,
          contact_method VARCHAR(100) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE NOT NULL
        )
      `;
      
      // Restore existing data if any
      if (existingData.length > 0) {
        console.log("Restoring existing contact messages...");
        for (const record of existingData) {
          let firstName = record.name ? record.name.split(' ')[0] : 'Unknown';
          let lastName = record.name ? (record.name.split(' ').slice(1).join(' ') || 'Unknown') : 'Unknown';
          
          // Parse address if it exists
          let street = 'Unknown', city = 'Unknown', state = 'Unknown', zip = 'Unknown';
          if (record.address) {
            const addressParts = record.address.split(',').map(part => part.trim());
            street = addressParts[0] || 'Unknown';
            city = addressParts[1] || 'Unknown';
            const stateZip = addressParts[2] ? addressParts[2].split(' ') : [];
            state = stateZip[0] || 'Unknown';
            zip = stateZip[1] || 'Unknown';
          }
          
          // Parse additional_info if it exists
          let propertyType = 'Unknown', projectTimeframe = 'Unknown', budgetRange = 'Unknown', contactMethod = 'Unknown';
          if (record.additional_info) {
            try {
              const additionalInfo = typeof record.additional_info === 'string' 
                ? JSON.parse(record.additional_info) 
                : record.additional_info;
              
              propertyType = additionalInfo.propertyType || 'Unknown';
              projectTimeframe = additionalInfo.projectTimeframe || 'Unknown';
              budgetRange = additionalInfo.budgetRange || 'Unknown';
              contactMethod = additionalInfo.contactMethod || 'Unknown';
            } catch (e) {
              console.error("Error parsing additional_info:", e.message);
            }
          }
          
          await sql`
            INSERT INTO contact_messages (
              first_name, last_name, email, phone, 
              street, city, state, zip,
              property_type, project_timeframe, budget_range, contact_method,
              message, created_at
            ) VALUES (
              ${firstName}, ${lastName}, ${record.email || 'unknown@example.com'}, ${record.phone || 'Unknown'},
              ${street}, ${city}, ${state}, ${zip},
              ${propertyType}, ${projectTimeframe}, ${budgetRange}, ${contactMethod},
              ${record.message || 'No message'}, ${record.created_at || new Date()}
            )
          `;
        }
        console.log(`Restored ${existingData.length} contact messages.`);
      }
      
    } catch (dropError) {
      if (dropError.message.includes('does not exist')) {
        console.log("contact_messages table didn't exist, creating it from scratch.");
        
        // Create new table with proper columns
        await sql`
          CREATE TABLE contact_messages (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            street VARCHAR(255) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(50) NOT NULL,
            zip VARCHAR(20) NOT NULL,
            property_type VARCHAR(100) NOT NULL,
            project_timeframe VARCHAR(100) NOT NULL,
            budget_range VARCHAR(100) NOT NULL,
            contact_method VARCHAR(100) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE NOT NULL
          )
        `;
      } else {
        throw dropError;
      }
    }

    // Check contact_messages table structure
    console.log("\nChecking new contact_messages table structure...");
    const contactColumns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'contact_messages'
      ORDER BY ordinal_position
    `;
    
    console.log("Contact message columns:");
    contactColumns.forEach(col => {
      console.log(`- ${col.column_name}: ${col.data_type}`);
    });
    
    console.log("\nSchema update completed successfully!");
    
  } catch (error) {
    console.error("Failed to update schema:", error.message);
  }
}

updateSchema(); 