export interface MangaBusqueda {
    "data":Array<{
        "id": number,
        "type": string,
        "attributes":{
            
            "startDate": string,
            "endDate": string,
            "popularityRank": string,
            "ratingRank": string,
            "updatedAt": string,
            "slug": string,
            "synopsis":string,
            "description": string,
            "titles": {
                "en": string,
                "en_jp": string,
                "en_us": string,
                "ja_jp": string,
            },
            "averageRating":string,
             
            "status": String,
            "serialization": string,
            
            "relationships":{
                "genres":{
                    "links":string,
                },
                "categories":{
                    "links":string,
                },
            },
            
            "posterImage":{
                "medium": string,
                "large":string,
                "original":string
            },
            "coverImage": any,
            
            "links":{
                "self": string
                "first": string,
                "next": string,
                "last": string,
            }
            "volumeCount": string,
        },  
    }>,
    "meta":{
        "count":number
    },
    "links":{
        "first":string,
        "next":string,
        "prev":string,
        "last":string
    }
}
