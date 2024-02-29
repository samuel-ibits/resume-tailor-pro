

import { NextResponse } from "next/server";
// import service
import * as authService from '../../services/authService';


// Handles GET requests to /api
export async function GET() {

    //do buisness

    // return response
  return NextResponse.json({
    message: "fetched",
    // data: data,
  },{ status: 200 });
}

// Handles POST requests to /api
export async function POST(req) {
    // get data
  const {username, email, password } = req.body;

    // do buisnes
    const user = await authService.createUser(username, email, password);
   

     // return response
  return NextResponse.json({
     message: "created" ,
    //  data:data,
    }, { status: 201 });
}

