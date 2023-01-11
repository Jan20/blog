""" Provides a range of functions used to create the overview page for blog
    posts.
"""
import os
from os import listdir
from os.path import isdir, join
from pathlib import Path

root_dir: str = f'{Path(__file__).parent.parent}'


class Post:
    """ Defines a post, consisting of a category, topic, headline,
        summary, link and thumbnail
    """

    def __init__(
        self,
        category: str,
        topic: str,
        headline: str,
        summary: str,
        link: str,
        thumbnail: str,
        date: str,
        series: str,
        series_section: int
    ):
        self.category: str = category
        self.topic: str = topic
        self.headline: str = headline
        self.summary: str = summary
        self.link: str = link
        self.thumbnail: str = thumbnail
        self.date: str = date
        self.series: str = series
        self.series_section: int = series_section


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
    summary = parse_summary(file_path)
    date = parse_date(file_path)
    series = parse_series(file_path)
    series_section = parse_series_section(file_path)
    category = file_path.split('/')[9]
    relative_path = '/'.join(file_path.split('/')[5:])
    link = compose_link(relative_path)
    thumbnail_path = compose_thumbnail_path(relative_path)

    return Post(
        category,
        topic,
        headline,
        summary,
        link,
        thumbnail_path,
        date,
        series,
        series_section
    )


def parse_headline(file_path: str) -> str:
    """Opens a file containing a blog posts, iterates over the file and returns
    the post's headline if existing.
    """
    with open(file_path) as reader:
        for line in reader:
            headline = line.split('# ')
            if len(headline) > 1:
                return clean_str(headline[1])


def parse_topic(file_path: str) -> str:
    """ Opens a file containing a blog posts, iterates over the file and returns
        the post's topic if existing.
    """
    with open(file_path) as reader:
        for line in reader:
            topic = line.split('topic=')
            if len(topic) > 1:
                return clean_str(topic[1])


def parse_date(file_path: str) -> str:
    """ Opens a file containing a blog posts, iterates over the file and returns
        the post's date if existing.
    """
    with open(file_path) as reader:
        for line in reader:
            date = line.split('date=')
            if len(date) > 1:
                return clean_str(date[1])


def parse_series(file_path: str) -> str:
    """ Opens a file containing a blog posts, iterates over the file and returns
        the series to which a post belongs to.
    """
    with open(file_path) as reader:
        for line in reader:
            series = line.split('series=')
            if len(series) > 1:
                return replace_underscores(series[1])


def parse_series_section(file_path: str) -> int:
    """ Opens a file containing a blog posts, iterates over the file and returns
        the series to which a post belongs to.
    """
    with open(file_path) as reader:
        for line in reader:
            series_section = line.split('series_section=')
            if len(series_section) > 1:
                return int(series_section[1])


def parse_summary(file_path: str) -> str:
    """ Opens a file containing a blog posts, iterates over the file and returns
        the series to which a post belongs to.
    """
    with open(file_path) as reader:
        for line in reader:
            summary = line.split('summary=')
            if len(summary) > 1:
                return clean_str(summary[1])


def clean_str(line: str) -> str:
    """ Removes whitespaces from a given str. """
    return line.replace('\n', ' ').replace('\r', ' ').replace("'", '')[:-1]


def replace_underscores(line: str) -> str:
    """ Replaces underscores with spaces. """
    return line.replace('_', ' ').replace('\n', '')


def write_posts_to_file(posts: [Post]) -> None:
    """ Writes a parsed Post object to a typescript file."""
    first_line = 'import { Post } from "src/app/modules/blog/models/post"; \n'
    path_elements: [str] = posts[0].link.split("/")[:-2]
    relative_path = "/".join(path_elements)
    index_file = f'{root_dir}/src{relative_path}/{posts[0].category}.ts'
    with open(index_file, 'w') as writer:
        writer.write(first_line)
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


def compose_link(file_path: str) -> str:
    """ Computes the path to a post's thumbnail."""
    print(file_path)
    file_name = file_path.split("/")[-1]
    link = '/'.join(file_path.split("/")[2:-1])
    return f'/{link}/{file_name}'


def parse_post_to_line(post: Post) -> str:
    """ Converts a Post object to a line, intended to be written to an index
        file.
    """
    line: str = ''
    line += "    new Post("
    line += f"'{post.category}', "
    line += f"'{post.topic}', "
    line += f"'{post.headline}', "
    line += f"'{post.summary}', "
    line += f"'{post.link}', "
    line += f"'{post.thumbnail}', "
    line += f"'{post.date}'"
    if post.series:
        line += f", '{post.series}'"
    if post.series_section:
        line += f", {post.series_section}"
    line += "), \n"
    print(post.headline)
    return line


if __name__ == '__main__':
    compose_index_files()
