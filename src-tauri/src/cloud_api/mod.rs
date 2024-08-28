pub(crate) mod search;
pub(crate) mod search_fixer;


#[allow(dead_code)]
fn main() {
    let mut result = search::search_by_keywords("周杰伦").unwrap();
    println!("{:#?}", result);

    search_fixer::fix_cover_url(&mut result).unwrap();
    println!("{:#?}", result);
}
