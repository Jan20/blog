import os
from os import listdir
from os.path import isdir, join
from pathlib import Path


class Post:
    def __init__(
        self,
        category: str,
        topic: str,
        title: str,
        first_paragraph: str,
        link: str,
        thumbnail: str
    ):
        self.category: str = category
        self.file_name: str = file_name
        self.title: str = title
        self.first_paragraph: str = first_paragraph
        self.link: str = link
        self.thumbnail: str = thumbnail


def compose_index_files() -> None:
    """_summary_
    """
    categories: [bytes] = select_categories()
    for category in categories:
        post_dirs: [bytes] = select_post_dirs(category)
        posts: [Post] = parse_posts_in_category(post_dirs)
        if len(posts) > 0:
            print(category)
            print(posts)
            write_posts_to_file(posts)


def parse_posts_in_category(post_dirs: [str]) -> [Post]:
    """ Takes a list of directories that may contain a post,
        checks whether the directory indeed contains a post and
        parses the content of the directory into a Post object.
    """
    posts: [Post] = []
    for post_dir in post_dirs:
        post_file: str = select_post(post_dir)
        posts.append(extract_post_from_file(post_file))
    return posts


def select_categories() -> [bytes]:
    """ Selects directories, containing categories of posts.
    """
    root_dir: str = f'{Path(__file__).parent.parent}'
    full_dir_name: str = f'{root_dir}/src/assets/posts'
    categories: [bytes] = []
    for directory in listdir(full_dir_name):
        categories.append(os.path.join(full_dir_name, directory))
    return list(filter(lambda category: isdir(category), categories))


def select_post_dirs(category: str) -> [bytes]:
    """ Selects all posts contained in a category.
    """
    posts: [bytes] = []
    for directory in listdir(category):
        posts.append(join(category, directory))
    return list(filter(lambda post: isdir(post), posts))


def select_post(post_dir: str) -> str:
    """ Selects the markdown file containing the actual post
    """
    for file in listdir(post_dir):
        # noinspection PyTypeChecker
        if file.endswith('.md'):
            return join(post_dir, file)


def extract_post_from_file(file_path: str) -> Post:
    """ Reads the content of a file, identified by its file path.
    """
    title: str = None
    with open(file_path) as reader:
        for line in reader:
            title_candidate = line.split('# ')
            if title is None and len(title_candidate) > 1:
                title = title_candidate[1]
                continue
            candidate = line.split(' ')
            if title is not None and len(candidate) > 1:
                return Post(
                    file_path.split('/')[4],
                    file_path.split('/')[-1],
                    title.replace('\n', ' ').replace('\r', ' '),
                    line.replace('\n', ' ').replace(
                        '\r', ' ').replace("'", ''),
                    file_path,
                    compose_thumbnail_path(file_path)
                )


def write_posts_to_file(posts: [Post]) -> None:
    import_statement = 'import { Post } from "src/app/modules/blog/models/post"; \n'
    file_path = '/'.join(posts[0].link.split("/")[:-2])
    index_file = f'{file_path}/{posts[0].category}.ts'
    with open(index_file, 'w') as writer:
        writer.write(import_statement)
        writer.write('\n')
        writer.write(f'export const {posts[0].category}: Post[] = [\n')
        for post in posts:
            line = parse_post_to_line(post)
            writer.write(line)
        writer.write(']')


def compose_thumbnail_path(file_path: str) -> str:
    file_path = '/'.join(file_path.split("/")[2:-1])
    return f'{file_path}/thumbnail.png'


def parse_post_to_line(post: Post) -> str:
    """ Converts a Post object to a line, intended to be written to an index file.
    """
    return f"    new Post('{post.category}', '{post.topic}', '{post.title}', '{post.first_paragraph}', '{post.link}', '{post.thumbnail}'), \n"


if __name__ == '__main__':
    compose_index_files()
