"""empty message

Revision ID: 01aef6a5543a
Revises: 
Create Date: 2019-07-13 00:40:12.297010

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01aef6a5543a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=64), nullable=False),
    sa.Column('last_name', sa.String(length=64), nullable=False),
    sa.Column('email', sa.String(length=64), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.Column('subject', sa.String(length=64), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.alter_column('questions', 'answer',
               existing_type=sa.TEXT(),
               nullable=False)
    op.alter_column('questions', 'question',
               existing_type=sa.TEXT(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('questions', 'question',
               existing_type=sa.TEXT(),
               nullable=True)
    op.alter_column('questions', 'answer',
               existing_type=sa.TEXT(),
               nullable=True)
    op.drop_table('messages')
    # ### end Alembic commands ###
