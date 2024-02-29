import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import { CrudService } from '../../services/crudService';
import ProfileModel, { Profile } from '../../../models/profile';

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

export async function POST(req: NextApiRequest) {
  const body = await req.json();
  console.log("body", body)
  return handleRequest(body, async (req) => {
    return profileService.create(body);
  });
}

export async function GET(req: NextApiRequest) {
  return handleRequest(req, async (req) => {
      return profileService.getAll();

  });
}


export async function DELETE(req: NextApiRequest) {
  return handleRequest(req, async (req) => {
    const profileId = req.query.profileId as string;
    return profileService.delete(profileId);
  });
}

