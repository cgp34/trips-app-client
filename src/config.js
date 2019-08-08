const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "trips-app-2-api-dev-attachmentsbucket-13googjugq153"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://ubw0t65jwh.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_voXH1F2VF",
    APP_CLIENT_ID: "48nvpne7clpd2s1pvnrp3rflq4",
    IDENTITY_POOL_ID: "us-east-1:5b30af94-5318-492d-8873-bc1699c0a839"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "trips-app-2-api-prod-attachmentsbucket-1vvivjj3d1sil"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://t5101mcu2k.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_dfKnuQU4S",
    APP_CLIENT_ID: "69b5fnlcpfg1b1dq9i9rgr3191",
    IDENTITY_POOL_ID: "us-east-1:5c7771f7-bafd-4f8e-b305-f9ea5b9a8181"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
