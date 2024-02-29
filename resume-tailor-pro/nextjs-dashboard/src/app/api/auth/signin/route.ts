import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import  connectMongoDB from "@/lib/mongo";

// Import service
import * as authService from '../../../services/authService';




// Define interface for the request body
interface RequestBody {
  email: string;
  password: string;
}


// Handles POST requests to /api
export async function POST(req: NextApiRequest) {

  try {
 await connectMongoDB();

  // Parse JSON request body
  const body = await req.json();
  // Get data
  const { email, password } = body;

  // Do business logic
  const dataOrErrorMessage = await authService.signIn(email, password);
  

  // Return a successful response
  return NextResponse.json({
   
    data: dataOrErrorMessage,
  }, { status: 200 });


} catch (error) {
  console.error('Error handling signup request:', error);
  return NextResponse.json({
    message: 'Internal server error',
    data: null,
  }, { status: 500 });
}

}
