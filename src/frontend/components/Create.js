import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
// import { create as ipfsHttpClient } from 'ipfs-http-client'
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
import axios from 'axios'
const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('')
  const [file, setFile] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const uploadIToIPFS = async (event) => {
    event.preventDefault()
    const iFile = event.target.files[0]
    if (typeof iFile !== 'undefined') {
      try {
        const formData = new FormData()
        formData.append("file", iFile)
        const result = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_SECRET}`,
            "Content-Type": "multipart/form-data"
          }
        })
        console.log(result)
        setImage(`ipfs://${result.data.IpfsHash}`)
      } catch (error) {
        console.log("ipfs image upload error: ", error)
      }
    }
  }
  const uploadFToIPFS = async (event) => {
    event.preventDefault()
    const fFile = event.target.files[0]
    if (typeof fFile !== 'undefined') {
      try {
        const formData = new FormData()
        formData.append("file", fFile)
        const result = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_SECRET}`,
            "Content-Type": "multipart/form-data"
          }
        })
        console.log(result)
        setFile(`ipfs://${result.data.IpfsHash}`)
      } catch (error) {
        console.log("ipfs image upload error: ", error)
      }
    }
  }
  const createNFT = async () => {
    if (!image || !file || !price || !name || !description) return
    try {

      // const result = await client.add(JSON.stringify({
      //   image, price, name, description, attributes: {
      //     file: file
      //   }
      // }))
      const metadata = JSON.stringify({
        name,
        description,
        image,
        attributes: {
          file: file
        }
      })
      const result = await axios(
        {
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          data: metadata,
          headers: {
            'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_SECRET}`,
            "Content-Type": "application/json"
          }
        }
      )
      mintThenList(result.data.IpfsHash)
    } catch (error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `ipfs://${result}`
    // mint nft 
    await (await nft.mint(uri)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  }
  return (
    <div className="container mt-5 px-5">
      <h1>Create & List NFT</h1>
      <Form>
        <Form.Group className="mb-3" controlId="BookCover">
          <Form.Label className='w-full'>Book Cover</Form.Label>
          <Form.Control
            type="file"
            required
            name="image"
            onChange={uploadIToIPFS}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="BookPDF">
          <Form.Label className='w-full'>Book PDF</Form.Label>
          <Form.Control
            type="file"
            required
            name="file"
            onChange={uploadFToIPFS}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Description">
          <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Price">
          <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
        </Form.Group>

        <div className="d-grid px-0">
          <Button onClick={createNFT} variant="dark" size="lg">
            Create & List NFT!
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Create