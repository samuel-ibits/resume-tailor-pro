import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import  connectMongoDB from "@/lib/mongo";

// Import service
import * as authService from '../../../services/authService';
 
// Handles POST requests to /api/signup
export async function POST(req: NextApiRequest) {

  try {
    connectMongoDB();
    // Parse JSON request body
    const body = await req.json();
     console.log("body", body)
    // Get data from the request body
    const { username, email, password } = body;

    // Create a new user
    const dataOrErrorMessage = await authService.createUser(username, email, password);

    // Check if there was an error
    if (typeof dataOrErrorMessage === 'string') {
      return NextResponse.json({
        message: dataOrErrorMessage,
        data: null,
      }, { status: 400 }); // Set appropriate status code for error
    }

    // Return a successful response
    return NextResponse.json({
      message: "User created successfully",
      data: dataOrErrorMessage,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error handling signup request:', error);
    return NextResponse.json({
      message: 'Internal server error',
      data: null,
    }, { status: 500 });
  }
}
