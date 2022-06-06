import os
from os import listdir
from os.path import isdir, join
from pathlib import Path


class Post:
    """ Defines a post, consisting of a category, topic, headline,
        first_paragraph, link and thumbnail
    """

    def __init__(
        self,
        category: str,
        topic: str,
        headline: str,
        first_paragraph: str,
        link: str,
        thumbnail: str
    ):
        self.category: str = category
        self.topic: str = topic
        self.headline: str = headline
        self.first_paragraph: str = first_paragraph
        self.link: str = link
        self.thumbnail: str = thumbnail


def compose_index_files() -> None:
    """ Iterates over all categories, finds all posts in their respective
        category, creates a list of blog posts based on the files found in a
        category's directory and writes the parsed objects to a json file.
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
    """ Takes a list of directories that may contain blog posts,
        checks whether the directory actually contains any posts and
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
    return list(filter(isdir, categories))


def select_post_dirs(category: str) -> [bytes]:
    """ Selects all posts contained in a category.
    """
    posts: [bytes] = []
    for directory in listdir(category):
        posts.append(join(category, directory))
    return list(filter(isdir, posts))


def select_post(post_dir: str) -> str:
    """ Selects the markdown file containing the actual post
    """
    for file in listdir(post_dir):
        # noinspection PyTypeChecker
        if file.endswith('.md'):
            return join(post_dir, file)


def extract_post_from_file(file_path: str) -> Post:
    """ Reads the content of a file, identified by its file path. A file path
        may look similar as the one depicted below:
        ./src/assets/posts/guides/001_angular_apps_on_github_pages/angular.md
    """
    topic = parse_topic(file_path)
    headline = parse_headline(file_path)
    first_paragraph = parse_first_paragraph(file_path)
    return Post(
        file_path.split('/')[4],
        topic,
        headline,
        first_paragraph,
        file_path,
        compose_thumbnail_path(file_path)
    )


def parse_headline(file_path: str) -> str:
    """
    """
    with open(file_path) as reader:
        for line in reader:
            headline = line.split('# ')
            if len(headline) > 1:
                return clean_str(headline[1])


def parse_topic(file_path: str) -> str:
    """
    """
    with open(file_path) as reader:
        for line in reader:
            topic_candidate = line.split('topic=')
            if len(topic_candidate) > 1:
                return clean_str(topic_candidate[1])


def parse_first_paragraph(file_path: str) -> str:
    """
    """
    title: str = None
    with open(file_path) as reader:
        for line in reader:
            candidate = line.split('# ')
            if title is None and len(candidate) > 1:
                title = candidate[1]
                continue
            if title is not None:
                # print(clean_str(line))
                return clean_str(line).split('.')[0] + '.'


def clean_str(line: str) -> str:
    """ Removes whitespaces from a given str."""
    return line.replace('\n', ' ').replace('\r', ' ').replace("'", '')[:-1]


def write_posts_to_file(posts: [Post]) -> None:
    """ Writes a parsed Post object to a typescript file."""
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
    """ Computes the path to a post's thumbnail."""
    file_path = '/'.join(file_path.split("/")[2:-1])
    return f'{file_path}/thumbnail.png'


def parse_post_to_line(post: Post) -> str:
    """ Converts a Post object to a line, intended to be written to an index file.
    """
    return f"    new Post('{post.category}', '{post.topic}', '{post.headline}', '{post.first_paragraph}', '{post.link}', '{post.thumbnail}'), \n"


if __name__ == '__main__':
    compose_index_files()
