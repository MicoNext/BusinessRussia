// src/app/dream/[id]/route.ts
import { execute } from '@/utils/db/db'
import { SelectResponseDBT } from '@/utils/db/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ errorMsg: "Invalid ID" }, { status: 400 })
  }

  return NextResponse.json({ msg: "ok", data: {} }, { status: 200 })
}