// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// BaseURI: https://nft-collection-learnweb3.vercel.app/api/
// TokenId: 1
// https://nft-collection-learnweb3.vercel.app/api/1

export default function handler(req, res) {
  // get the tokenId from the query params
  const tokenId = req.query.tokenId;
  // As all the images are uploaded on github, we can extract the images from github directly.
  // Click on Image and select Raw button
  const imgUrl =
    "https://raw.githubusercontent.com/CuongDuong2710/learning_smart_contract/main/nft-collection-learnweb3DAO/my-app/public/cryptodevs/";
  // The api is sending back metadata for a Crypto Dev
  // To make our collection compatible with Opensea, we need to follow some Metadata standards
  // when sending back the response from the api
  // More info can be found here: https://docs.opensea.io/docs/metadata-standards
  res.status(200).json({
    name: "Crypto Dev #" + tokenId,
    description: "Crypto Dev is a collection of developers in crypto",
    image: imgUrl + tokenId + ".svg",
  });
}
