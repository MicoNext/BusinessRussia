import { NextRequest, NextResponse } from "next/server"

export async function GET(req: Request) {
  try {

    return NextResponse.json({ msg: 'ok', data: [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: 'Ошибка при получении данных', error: "error get data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {

    return NextResponse.json({ msg: 'ok', data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { errorMsg: "Failed to create" },
      { status: 500 }
    )
  }
}


