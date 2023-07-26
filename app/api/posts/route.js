const { NextResponse } = require("next/server");

export const GET = async () => {
  return NextResponse.json({
    body: "connect",
  });
};
