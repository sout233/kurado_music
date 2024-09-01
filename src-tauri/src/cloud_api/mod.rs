pub(crate) mod search;
pub(crate) mod search_fixer;


#[allow(dead_code)]
async fn main() {
    let mut result = search::search_by_keywords("周杰伦").await.unwrap();
    println!("{:#?}", result);

    search_fixer::fix_cover_url(&mut result).await.unwrap();
    println!("{:#?}", result);
}
