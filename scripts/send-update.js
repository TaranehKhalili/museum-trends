#!/usr/bin/env node

/**
 * Script to send real-time visitor data updates to the Museum Trends Dashboard
 * 
 * Usage:
 *   node scripts/send-update.js
 *   node scripts/send-update.js --data "custom-data.json"
 *   node scripts/send-update.js --url "http://localhost:3000"
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Default configuration
const DEFAULT_URL = 'http://localhost:3000/api/visitors';
const DEFAULT_DATA_FILE = join(__dirname, 'sample-data.json');

// Parse command line arguments
const args = process.argv.slice(2);
const urlArg = args.find(arg => arg.startsWith('--url='));
const dataArg = args.find(arg => arg.startsWith('--data='));

const API_URL = urlArg ? urlArg.split('=')[1] : DEFAULT_URL;
const DATA_FILE = dataArg ? dataArg.split('=')[1] : DEFAULT_DATA_FILE;

async function sendUpdate() {
  try {
    console.log('🚀 Sending visitor data update...');
    console.log(`📡 URL: ${API_URL}`);
    
    let data;
    
    // Read data from file
    try {
      const fileContent = readFileSync(DATA_FILE, 'utf-8');
      data = JSON.parse(fileContent);
      console.log(`📄 Using data from: ${DATA_FILE}`);
    } catch (fileError) {
      console.error('❌ Error reading data file:', fileError.message);
      console.log('💡 Make sure the file exists and contains valid JSON');
      process.exit(1);
    }
    
    console.log(`📊 Sending ${data.length} data points:`);
    data.forEach((point, index) => {
      console.log(`   ${index + 1}. ${point.date} - ${point.museum}: ${point.value.toLocaleString()} visitors`);
    });
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    console.log('✅ Update sent successfully!');
    console.log(`📈 Response: ${result.message}`);
    console.log(`🔄 Chart should update in real-time on all connected browsers`);
    
  } catch (error) {
    console.error('❌ Error sending update:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   - Make sure the development server is running (pnpm dev)');
    console.log('   - Check that the API URL is correct');
    console.log('   - Verify the data format is valid JSON');
    process.exit(1);
  }
}

// Show help if requested
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
📊 Museum Trends Dashboard - Data Update Script

Usage:
  node scripts/send-update.js                    # Use default settings
  node scripts/send-update.js --url=<url>        # Custom API URL
  node scripts/send-update.js --data=<file>      # Custom data file
  node scripts/send-update.js --help             # Show this help

Examples:
  node scripts/send-update.js
  node scripts/send-update.js --url=http://localhost:3000/api/visitors
  node scripts/send-update.js --data=./my-data.json

Default URL: ${DEFAULT_URL}
Default Data: ${DEFAULT_DATA_FILE}
`);
  process.exit(0);
}

// Run the script
sendUpdate();
