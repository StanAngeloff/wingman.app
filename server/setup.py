from setuptools import setup, find_packages

setup(
    name='wingman.app',
    version='0.1.0',
    long_description=__doc__,
    packages=find_packages(),
    scripts=['start-local-server.py'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'Flask>=0.8',
        'Jinja2>=2.6',
        'Werkzeug>=0.8',
        'distribute>=0.6',
        'wsgiref>=0.1'
    ],
    author='Stan Angeloff',
    author_email='stanimir@angeloff.name',
    license='AGPLv3',
    url='https://github.com/StanAngeloff/wingman.app'
)
