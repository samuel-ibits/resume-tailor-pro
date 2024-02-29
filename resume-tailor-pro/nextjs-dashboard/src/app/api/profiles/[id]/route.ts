import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import { CrudService } from '../../../services/crudService';
import ProfileModel, { Profile } from '../../../../models/profile';

const profileService = new CrudService<Profile>(ProfileModel);

async function handleRequest(req: NextApiRequest, handler: (req: NextApiRequest) => Promise<any>) {
  try {
    const data = await handler(req);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json({ message: 'Internal server error', data: null }, { status: 500 });
  }
}

export async function PUT(req: NextApiRequest,  params :any ) {
  return handleRequest(req, async (req) => {
    const {id} = params;
    const updates = req.body;
    return profileService.update(id, updates);
  });
}

//handles update each request
export async function GET(req: NextApiRequest, params :any ) {

  return handleRequest(req, async (req) => {
    const { id } = params;
    
      return profileService.getById(id);

    }
  );
  
}
