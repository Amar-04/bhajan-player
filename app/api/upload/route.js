import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get('file')
  const folder = formData.get('folder') || 'bhajans'

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: 'auto', folder }, (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })
        .end(buffer)
    })

    return NextResponse.json({ url: upload.secure_url })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
