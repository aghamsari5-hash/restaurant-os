const fs = require('fs');
const path = require('path');
const gen = require('@prisma/client/generator-build/index.js');

const schemaPath = path.resolve(__dirname, '../prisma/schema.prisma');
const datamodel = fs.readFileSync(schemaPath, 'utf-8');

// Locate .prisma/client inside node_modules/@prisma/client
let outputDir = path.resolve(__dirname, '../node_modules/.prisma/client');
if (!fs.existsSync(outputDir)) {
  const rootPnpmPrismaClient = path.resolve(__dirname, '../../node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client');
  if (fs.existsSync(path.dirname(rootPnpmPrismaClient))) {
    outputDir = rootPnpmPrismaClient;
  } else {
    fs.mkdirSync(outputDir, { recursive: true });
  }
}

const dmmf = {
  datamodel: {
    models: [],
    enums: [],
    types: [],
    indexes: [],
  },
  schema: {
    inputObjectTypes: { prisma: [] },
    outputObjectTypes: {
      prisma: [
        { name: 'Query', fields: [] },
        { name: 'Mutation', fields: [] },
      ],
    },
    enumTypes: { prisma: [] },
    fieldRefTypes: { prisma: [] },
  },
  mappings: {
    modelOperations: [],
    otherOperations: {
      read: [],
      write: ['executeRaw', 'queryRaw'],
    },
  },
};

const generator = {
  name: 'client',
  provider: { value: 'prisma-client-js', fromEnvVar: null },
  output: { value: outputDir, fromEnvVar: null },
  config: { engineType: 'library' },
  binaryTargets: [],
  previewFeatures: [],
};

const datasources = [
  {
    name: 'db',
    provider: 'postgresql',
    url: {
      value: 'postgresql://postgres:postgres@localhost:5432/restaurant_os',
      fromEnvVar: 'DATABASE_URL',
    },
    sourceFilePath: schemaPath,
  },
];

async function generate() {
  try {
    await gen.generateClient({
      datamodel,
      schemaPath,
      outputDir,
      generator,
      dmmf,
      datasources,
      binaryPaths: { libqueryEngine: {} },
      testMode: false,
      copyRuntime: true,
      clientVersion: '5.22.0',
      engineVersion: '605197351a3c8bdd595af2d2a9bc3025bca48ea2',
      activeProvider: 'postgresql',
      postinstall: false,
      copyEngine: false,
    });
    console.log('Successfully generated Prisma Client (`.prisma/client`)');
  } catch (err) {
    console.error('Failed to generate Prisma Client:', err);
    process.exit(1);
  }
}

generate();
