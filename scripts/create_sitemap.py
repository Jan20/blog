import os
from datetime import datetime

import os

def select_topics(directory):
    directories = []
    for root, dirs, _ in os.walk(directory):
        if 'drafts' in dirs:
            dirs.remove('drafts')
        if dirs:
            directories.append(root)
    
    return directories[1:]

def collect_urls(directory):
    directories = select_topics(directory)
    urls = []
    for directory in directories:
        for root, dirs, _ in os.walk(directory):
            topic = root.split('/')[-1]
            if dirs:
                for dir in dirs:
                    urls.append(f'https://janladicha.de/{topic}/{dir}')
    return urls

def generate_sitemap(urls, filename="sitemap.xml"):
    # Create the XML header
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # Add each URL entry
    for url in urls:
        xml_content += "  <url>\n"
        xml_content += f"    <loc>{url}</loc>\n"
        xml_content += f"    <lastmod>{datetime.now().strftime('%Y-%m-%d')}</lastmod>\n"
        xml_content += "    <changefreq>weekly</changefreq>\n"
        xml_content += "    <priority>0.5</priority>\n"
        xml_content += "  </url>\n"
    
    # Close the urlset tag
    xml_content += "</urlset>"

    # Write to file
    with open(filename, "w") as file:
        file.write(xml_content)
    print(f"Sitemap saved to {os.path.abspath(filename)}")

# Generate the sitemap
generate_sitemap(collect_urls("/Users/jan/Developer/blog/src/assets/posts"))