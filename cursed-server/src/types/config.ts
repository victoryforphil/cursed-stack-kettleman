

  export interface Config {
    // Can put config like redis, minio, gcp, etc. here
    http:{
      address: string 
      port: number
    }
  } 