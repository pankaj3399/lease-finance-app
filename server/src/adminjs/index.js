import AdminJSExpress from '@adminjs/express';
import * as AdminJSMonggoose from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import mongoStore from 'connect-mongo';

import UserModel from '../modules/user/model.js';

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'admin',
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const initAdminJS = async (app) => {
  AdminJS.registerAdapter({
    Resource: AdminJSMonggoose.Resource,
    Database: AdminJSMonggoose.Database,
  });

  const adminModels = [UserModel];

  const adminOptions = {
    resources: adminModels,
    branding: {
      logo: '',
      companyName: 'Lease app',
      favicon: '',
      withMadeWithLove: false,
    },
  };

  const admin = new AdminJS(adminOptions);

  const sessionStore = mongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'adminJsSession',
    ttl: 14 * 24 * 60 * 60,
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'Secret',
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'Secret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  console.log(
    `AdminJS started on => http://localhost:${process.env.PORT}${admin.options.rootPath}`
  );

  return admin;
};

export default initAdminJS;
