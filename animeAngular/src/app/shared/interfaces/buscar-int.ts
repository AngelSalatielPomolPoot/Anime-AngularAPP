export interface buscarInt {
    "request_hash":string,
    "request_cache_expiry":number,
    "results":Array<{
        "mal_id":string,
        "url":string,
        "image_url":string,
        "title":string,
        "airing":string,
        "synopsis":string,
        "type":string,
        "episodes":string,
        "score":string,
        "start_date":string,
        "end_date":string,
        "members":string,
        "rated":string
    }>,
    "last_page":number

}
