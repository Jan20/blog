""" Provides a range of functions used to create the overview page for blog
    posts.
"""
import os
from os import listdir
from os.path import isdir, join
from pathlib import Path
from dataclasses import dataclass

root_dir: str = f'{Path(__file__).parent.parent}'


@dataclass
class Post:
    """ Defines a post, consisting of a category, topic, headline,
        summary, link, thumbnail, date, series, series_section, and route.
    """
    category: str
    topic: str
    headline: str
    summary: str
    file_path: str
    thumbnail_path: str
    date: str
    route: str
    series: str
    series_section: int


def compose_index_files() -> None:
    """ Iterates over all categories, finds all posts in their respective
        category, creates a list of blog posts based on the files found in a
        category's directory and writes the parsed objects to a json file.
    """
    base_dir = f"{Path(__file__).parent.parent}/src/assets/posts"

    category_dirs: [str] = list(filter(isdir, (join(base_dir, directory) for directory in listdir(base_dir))))

    for category_dir in category_dirs:
        post_dirs: [str] = list(filter(isdir, (join(category_dir, directory) for directory in listdir(category_dir))))
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
        post_file: str = [join(post_dir, file) for file in listdir(post_dir) if file.endswith('.md')][0]
        posts.append(extract_post_from_file(post_file))
    return posts


def extract_post_from_file(file_path: str) -> Post:
    """ Reads the content of a file, identified by its file path. A file path
        may look similar as the one depicted below:
        ./src/assets/posts/guides/001_angular_apps_on_github_pages/angular.md
    """

    # Extract the file name with extension
    file_name = os.path.basename(file_path)

    # If you want to extract just the file name without the extension
    file_name_without_extension, file_extension = os.path.splitext(file_name)

    print("Full file name:", file_name)
    print("File name without extension:", file_name_without_extension)
    print("File extension:", file_extension)

    relative_path = '/'.join(file_path.split('/')[5:])

    return Post(
        category=file_path.split('/')[9],
        topic=parse_topic(file_path),
        headline=parse_headline(file_path),
        summary=parse_summary(file_path),
        file_path=compose_file_path(relative_path),
        thumbnail_path=compose_thumbnail_path(relative_path),
        date=parse_date(file_path),
        series=parse_series(file_path),
        series_section=parse_series_section(file_path),
        route=file_path
    )


def parse_headline(file_path: str) -> str:
    """
    Opens a file containing a blog posts, iterates over the file and returns
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
                return series[1].replace('_', ' ').replace('\n', '')


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


def write_posts_to_file(posts: [Post]) -> None:
    """ Writes a parsed Post object to a typescript file."""
    path_elements: [str] = posts[0].file_path.split("/")[:-2]

    category: str = path_elements[-1]

    relative_path = "/".join(path_elements)

    index_file = f'{root_dir}/src/assets/posts/{relative_path}/{category}.ts'

    with open(index_file, 'w') as writer:
        writer.write('import { Post } from "src/app/modules/shared/models/post"; \n')
        writer.write('\n')
        writer.write(f'export const {category}: Post[] = [\n')
        for post in posts:
            line = parse_post_to_line(post)
            writer.write(line)
        writer.write(']')


def compose_thumbnail_path(file_path: str) -> str:
    """ Computes the path to a post's thumbnail."""
    file_path = '/'.join(file_path.split("/")[2:-1])
    return f'assets/{file_path}/thumbnail.svg'


def compose_file_path(file_path: str) -> str:
    """ Computes the path to a post's thumbnail."""
    file_name = file_path.split("/")[-1]
    print(file_path.split("/"))
    link = '/'.join(file_path.split("/")[3:-1])
    print('_:_______')
    print(link)
    return f'/{link}/{file_name}'


def parse_post_to_line(post: Post) -> str:
    """Converts a Post object to a line for an index file."""
    series_part = f", '{post.series}'" if post.series else ""
    section_part = f", {post.series_section}" if post.series_section else ""

    return (
        f"    new Post('{post.category}', "
        f"'{post.topic}', "
        f"'{post.headline}', "
        f"'{post.summary}', "
        f"'{post.file_path}', "
        f"'{post.thumbnail_path}', "
        f"'{post.date}',"
        f"'{post.route}'"
        f"{series_part}"
        f"{section_part}"
        "), \n"
    )


if __name__ == '__main__':
    compose_index_files()
